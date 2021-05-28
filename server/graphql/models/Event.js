const BaseModel = require("./BaseModel");

class Event extends BaseModel {
  constructor(model, user) {
    super(model, user);
  }

  getAllByGameId(game_id) {
    return this.Model.find({ game_id })
  }



  async create(eventData) {
    if (!this.user || this.user.role!=='admin') {
      throw new Error("You need to be admin user to create a event!");
    }

  

    eventData.added_by = this.user._id;
    return this.Model.create(eventData)
  }
  findAndUpdate(id, data) {
    if (!this.user || this.user.role !== "admin") {
      throw new Error("You need to be admin user to update a event!");
    }

    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }
  findAndDelete(id){
    if (!this.user || this.user.role !== "admin") {
      throw new Error("You need to be admin user to delete a event!");
    }
    return this.Model.findOneAndRemove({_id:id})
  }
}

module.exports = Event;
