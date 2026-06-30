-- Database Initialization Schema for NoteFlow
-- Use this script in phpMyAdmin (InfinityFree) or MySQL Workbench (Local)

-- Create database if running locally (not needed on InfinityFree as the DB is pre-created)
-- CREATE DATABASE IF NOT EXISTS if0_42266548_noteapp;
-- USE if0_42266548_noteapp;

-- Create Notes Table with support for modern category colors
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  color VARCHAR(50) DEFAULT 'slate',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
