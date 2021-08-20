const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.filter((user) => user.id == contactId);
      console.table(user);
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const users = JSON.parse(data);
      const usersFiltered = users.filter((user) => user.id != contactId);
      fs.writeFile(contactsPath, JSON.stringify(usersFiltered, null, "\t"));
      console.log("Contact removed");
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const users = JSON.parse(data);
      const id = Date.now();
      users.push({ id: id, name: name, email: email, phone: phone });
      fs.writeFile(contactsPath, JSON.stringify(users, null, "\t"));
      console.log("Contact added");
    })
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
