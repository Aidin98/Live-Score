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

  create(data) {
    
    if (!this.user || this.writeRights !==this.user.role) {
      throw new Error("Not Authorised!!!");
    }

    data.added_by = this.user;
    return this.Model.create(data);
  }


  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Game;
