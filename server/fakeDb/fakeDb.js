const {data} =require('./data')

const User=require('../database/models/user')
const Game=require('../database/models/games')
const Event=require('../database/models/event')

class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Game.deleteMany({});
    await Event.deleteMany({});

  }

  async addData() {
    await User.create(users);
    await Game.create(portfolios);
    await Event.create(forumCategories);
    
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}
module.exports = new FakeDb();
