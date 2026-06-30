<?php
/**
 * NoteFlow - PHP API Bridge for InfinityFree Database
 * 
 * Instructions:
 * 1. Open this file and configure your Database Settings below.
 * 2. Upload this file (api.php) to your InfinityFree hosting account (e.g. inside htdocs/).
 * 3. Copy the URL of this uploaded script (e.g., https://yourdomain.infinityfreeapp.com/api.php).
 * 4. Paste that URL into the API Settings Modal in the React frontend!
 */

// --- 1. CONFIGURATION SETTINGS ---
// Replace these with your actual InfinityFree MySQL details
define('DB_HOST', 'sql200.infinityfree.com'); 
define('DB_USER', 'if0_42266548');           
define('DB_PASS', 'X7KPGZ28ssdveh');  
define('DB_NAME', 'if0_42266548_noteapp');    

// --- 2. CORS HEADERS & OPTIONS PREFLIGHT ---
// Enable access from any origin (so your local React app or hosted frontend can talk to it)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle OPTIONS preflight request (React fetch sends this first)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- 3. DATABASE CONNECTION ---
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // Auto-create notes table if it does not exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        color VARCHAR(50) DEFAULT 'slate',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database connection failed. Please check your DB configuration inside api.php.",
        "details" => $e->getMessage()
    ]);
    exit();
}

// --- 4. ROUTING & HANDLERS ---
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetNotes($pdo);
        break;
        
    case 'POST':
        handleCreateNote($pdo);
        break;
        
    case 'DELETE':
        handleDeleteNote($pdo);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed. Use GET, POST, or DELETE."]);
        break;
}

// --- 5. CRUD CONTROLLERS ---

// GET: Fetch all notes
function handleGetNotes($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM notes ORDER BY created_at DESC");
        $notes = $stmt->fetchAll();
        
        // Ensure every note has a color attribute (default to 'slate' if missing)
        foreach ($notes as &$note) {
            if (!isset($note['color'])) {
                $note['color'] = 'slate';
            }
        }
        
        echo json_encode($notes);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch notes: " . $e->getMessage()]);
    }
}

// POST: Create a new note
function handleCreateNote($pdo) {
    // Get raw post data
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['title'])) {
        http_response_code(400);
        echo json_encode(["error" => "Title is required!"]);
        return;
    }
    
    $title = trim($data['title']);
    $content = isset($data['content']) ? trim($data['content']) : '';
    $color = isset($data['color']) ? trim($data['color']) : 'slate';
    
    try {
        // 1. Try to insert with color column
        $query = "INSERT INTO notes (title, content, color) VALUES (:title, :content, :color)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':title' => $title,
            ':content' => $content,
            ':color' => $color
        ]);
        $insertId = $pdo->lastInsertId();
    } catch (PDOException $e) {
        // 2. Fallback: If table doesn't have a 'color' column, insert without it
        try {
            $query = "INSERT INTO notes (title, content) VALUES (:title, :content)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ':title' => $title,
                ':content' => $content
            ]);
            $insertId = $pdo->lastInsertId();
            $color = 'slate'; // fallback default
        } catch (PDOException $e2) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to save note: " . $e2->getMessage()]);
            return;
        }
    }
    
    http_response_code(201);
    echo json_encode([
        "id" => (int)$insertId,
        "title" => $title,
        "content" => $content,
        "color" => $color,
        "created_at" => date('Y-m-d H:i:s')
    ]);
}

// DELETE: Delete a note by id
function handleDeleteNote($pdo) {
    // Check if ID is provided in query params or path (e.g. api.php?id=1 or api.php/1)
    $id = null;
    
    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
    } else {
        // Fallback for REST paths, e.g. api.php/123
        $pathInfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : (isset($_SERVER['ORIG_PATH_INFO']) ? $_SERVER['ORIG_PATH_INFO'] : '');
        $parts = explode('/', trim($pathInfo, '/'));
        if (is_numeric(end($parts))) {
            $id = (int)end($parts);
        }
    }
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Note ID is required for deletion."]);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("DELETE FROM notes WHERE id = :id");
        $stmt->execute([':id' => $id]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Note not found."]);
            return;
        }
        
        echo json_encode(["message" => "Note deleted successfully!", "id" => $id]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete note: " . $e->getMessage()]);
    }
}
