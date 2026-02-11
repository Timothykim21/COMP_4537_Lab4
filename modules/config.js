// config.js
export const dbConfig = {
    admin: {
        host: 'localhost',
        user: 'lab_admin',
        password: 'admin_password',
        database: 'lab_db'
    },
    readOnly: {
        host: 'localhost',
        user: 'lab_readonly',
        password: 'read_password',
        database: 'lab_db'
    }
};

export const tableDefinition = `
    CREATE TABLE IF NOT EXISTS patient (
        patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        dateOfBirth DATETIME
    ) ENGINE=InnoDB;
`;