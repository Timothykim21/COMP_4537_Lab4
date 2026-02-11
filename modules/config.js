// config.js
export const dbConfig = {
    admin: {
        host: 'localhost',
        user: 'lab_admin',
        password: '#Comp4537_admin',
        database: 'lab_db'
    },
    readOnly: {
        host: 'localhost',
        user: 'lab_readonly',
        password: '#Comp4537_read',
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