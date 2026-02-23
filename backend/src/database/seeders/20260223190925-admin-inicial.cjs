'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const senhaHash = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('usuario', [{
      id: require('crypto').randomUUID(),
      nome: 'Administrador',
      senha: senhaHash,
      email: 'admin@sistema.com',
      perfil: 'admin',
      criado_em: new Date(),
      atualizado_em: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('usuario', {
      email: 'admin@sistema.com'
    });
  }
};