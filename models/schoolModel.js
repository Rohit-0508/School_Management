const db= require('../config/db');

const createTable= async()=>{
    const query=`
        CREATE TABLE IF NOT EXISTS schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
        );
    `;
    await db.query(query);
}

const addSchool = async(name, address, latitude, longitude)=>{
    const query= 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result]= await db.query(query,[name, address, latitude, longitude]);
    return result.insertId;
}

const listSchools = async (latitude, longitude) => {
    const query = `
        SELECT *, (
            6371 * acos(
                cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
                sin(radians(?)) * sin(radians(latitude))
            )
        ) AS distance
        FROM schools
        ORDER BY distance
    `;
    const [rows] = await db.query(query, [latitude, longitude, latitude]);
    return rows;
};

module.exports = {
    createTable,
    addSchool,
    listSchools
};