// userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('./userModel');
const authModel = require('./authModel');
const { encrypt, comparePassword } = require('./md5');

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un utilisateur par ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = encrypt(password);
    await userModel.createUser(email, hashedPassword);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Mettre à jour un utilisateur existant
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await userModel.updateUser(id, name, email);
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign up un utilisateur
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }
    const hashedPassword = encrypt(password);
    await userModel.createUser(email, hashedPassword);
    res.json({ message: 'Bienvenue' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(`Attempting to sign in user with email: ${email}`);
    const user = await userModel.getUserByEmail(email);

    if (!user || !comparePassword(user.password, password)) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }

    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const auth = await authModel.createAuth(user.id, date);

    const cleanAuth = {
      authId: auth.id,
      userId: auth.user_id,
      date: auth.date,
    };
    res.status(200).send({ message: 'Signed in', auth: cleanAuth });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Déconnexion d'un utilisateur
router.delete('/logout', async (req, res) => {
  try {
    const { authId } = req.body;
    if (!authId) {
      return res.status(400).json({ error: 'ID d\'authentification requis' });
    }
    const t = await authModel.deleteAuth(authId);
    console.log(t)
    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
