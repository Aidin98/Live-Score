const BaseModel = require("./BaseModel");

class Event extends BaseModel {
  constructor(model, user) {
    super(model, user);
  }

  getAllByGameId(game_id) {
    return this.Model.find({ game_id }).populate("user").populate("games");
  }

  async _create(data) {
    const createdEvent = await this.Model.create(data);
    return this.Model.findById(createdEvent._id)
      .populate("user")
      .populate("games");
  }

  async create(eventData) {
    if (!this.user) {
      throw new Error("You need to authenticate to create a event!");
    }

    eventData.added_by = this.user;

    let event;

    event = await this._create(eventData);
    
    return event;
  }
  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = Event;
