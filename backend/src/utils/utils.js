import {promises as fs} from  'fs';



async function writeDataToFile(filename, data){
    await fs.writeFile(filename, JSON.stringify(data, null, 3))
}

async function readDataFromFile(filename){
const data =  await fs.readFile(filename, 'utf8');
return JSON.parse(data);
}

async function check_If_Db_Exists(DB_Path){
    try {
        await fs.access(DB_Path, )
        console.log("DB exists")
      } catch(err) {
        await writeDataToFile(DB_Path, []); 
        console.log("DB created")
      }
}


// Path: backend/src/utils/utils.js
async function updateItem(id, filename, userdata) {
    const users = await readDataFromFile(filename) 
    const user = users.find((user => user.id === id));
    const updateUser = { ...user, ...userdata };
    const index = users.findIndex((user => user.id === id));
    users[index] = updateUser;
    await writeDataToFile(filename, users);
    return users;
}

//remove data based on ID and updates the database
 async function deleteItem(id, filename) {
  try {
    const users = await readDataFromFile(filename)
    const updusers = users.filter((p => p.id !== id));
    await writeDataToFile(filename, updusers);
    return true;    
  } catch (error) {
    console.log('user not found')
    return false;
  }

}



export {
    readDataFromFile,
    writeDataToFile,
    check_If_Db_Exists,
    updateItem,
    deleteItem,
}