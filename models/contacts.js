const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function writeFile(contacts) {
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find(
    (contact) => contact.id === contactId
  );

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const [delContact] = contacts.splice(contactIndex, 1);

  try {
    await writeFile(contacts)
  } catch (error) {
    return error;
  }
  return delContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  try {
   await writeFile(contacts);
  } catch (error) {
    return error;
  }

  return newContact;
}

async function editContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  const editContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  if (contactIndex === -1) {
    return null;
  }

  contacts.splice(contactIndex, 1, editContact);

  await writeFile(contacts);

  return contacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};
