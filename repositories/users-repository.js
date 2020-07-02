class UsersRepository {
  constructor(db) {
    this.db = db;
  }

  async get(id) {
    const conn = await this.db.getConnection();
    const users = await conn.query("SELECT * FROM users WHERE id = ?", id);
    return users[0];
  }

  async create(user) {
    const conn = await this.db.getConnection();
    const result = await conn.query("INSERT INTO users (name, is_enabled) VALUES (?, ?)", [
      user.name,
      user.is_enabled
    ]);
    return { id: result.insertedId, ...user };
  }
}

module.exports = UsersRepository;
