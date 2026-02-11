const http = require('http');
const url = require('url');
const mysql = require('mysql2/promise');
const { dbConfig, tableDefinition } = require('./modules/config.js');

class DBManager {
async executeQuery(sql, isAdmin = false) {
    const credentials = isAdmin ? dbConfig.admin : dbConfig.readOnly;
    const connection = await mysql.createConnection(credentials);
    
    try {
        if (isAdmin) {
            await connection.query(tableDefinition);
        }
        
        const [results] = await connection.query(sql);
        return results;
    } catch (err) {
        throw new Error(err.message);
    } finally {
        await connection.end();
    }
}
}

class DatabaseServer {
    constructor(port) {
        this.port = port;
        this.db = new DBManager();
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res))
            .listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
    }

    async handleRequest(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            return res.end();
        }

        const parsedUrl = url.parse(req.url, true);

        try {
            if (req.method === 'POST' && parsedUrl.pathname === '/insert') {
                const insertSql = `INSERT INTO patient (name, dateOfBirth) VALUES 
                    ('Sara Brown', '1901-01-01'),
                    ('John Smith', '1941-01-01'),
                    ('Jack Ma', '1961-01-30'),
                    ('Elon Musk', '1999-01-01')`;
                
                await this.db.executeQuery(insertSql, true); 
                res.writeHead(200);
                res.end(JSON.stringify({ message: "Data inserted successfully." }));

            } else if (req.method === 'GET' && parsedUrl.pathname === '/query') {
                const userSql = parsedUrl.query.sql;
                
                const data = await this.db.executeQuery(userSql, false); 
                res.writeHead(200);
                res.end(JSON.stringify(data));
            }
        } catch (error) {
            res.writeHead(403); 
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}

const myServer = new DatabaseServer(3004);
myServer.start();