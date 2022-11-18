import path from 'path';
import {fileURLToPath} from 'url';
import { customAlphabet } from 'nanoid/async'

// import { customers } from '../db/customers.json';
import { readDataFromFile, writeDataToFile, check_If_Db_Exists, updateItem, deleteItem,} from '../utils/utils.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = path.join(__dirname, '..', '..', '/db/users.json');
const nanoid = customAlphabet('12345678900', 10)

export const resolvers = { 
  Query: {
  users: async() => await readDataFromFile(users),
  user: async (parent, args) => {
    const usersdata = await readDataFromFile(users) 
    return usersdata.find(user => user.id === args.id);
    }
},

Mutation: {
  createUser: async (parent, args) => {  
    try {
      await check_If_Db_Exists(users);
      if(users){
        const data = await readDataFromFile(users);
        const newUser = {
          id: await nanoid(),
          firstname: args.firstname,
          email: args.email,
          lastname: args.lastname 
      }
      data.push(newUser);
      await writeDataToFile(users, data);
      return newUser; 
    }
} catch(err) {
    console.log("unable to create account")
} 
  },
  deleteUser: async(parent, args) => {
    return await deleteItem(args.id, users)  
  },
  updateUser: async(parent, args) => {
    return await updateItem(args.id, users, args)
  },
 }
};

