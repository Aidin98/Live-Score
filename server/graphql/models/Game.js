
const BaseModel = require("./BaseModel");

class Game extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.writeRights = "admin";
  }

  getAll() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(data,currentDate) {
    if (!this.user || this.user.role !== "admin") {
      throw new Error("You need to be admin user to create a game!");
    }

    data.added_by = this.user;
   {/* if(data.time_start<data.currentTime){
      throw new Error("Invalid Date, Date should be greater that current Date")
    }*/}
    return this.Model.create(data);
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Game;
