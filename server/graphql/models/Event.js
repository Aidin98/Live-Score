const BaseModel = require("./BaseModel");

class Event extends BaseModel {
  constructor(model, user) {
    super(model, user);
  }

  getAllByGameId(game_id) {
    return this.Model.find({ game_id })
  }



  async create(eventData) {
    if (!this.user) {
      throw new Error("You need to authenticate to create a event!");
    }

    eventData.added_by = this.user._id;
    return this.Model.create(eventData)
  }
  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }
  findAndDelete(id){
    return this.Model.findOneAndRemove({_id:id})
  }
}

module.exports = Event;
