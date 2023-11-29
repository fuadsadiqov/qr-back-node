const Team = require('../models/teams.model'); 

class TeamsService {
  async createTeam(name, description) {
    const newTeam = new Team({ name, description });
    return await newTeam.save();
  }

  async getAllTeams() {
    return await Team.find();
  }

  async getTeamById(id) {
    return await Team.findById(id);
  }

  async updateTeam(id, name, description) {
    const team = await Team.findById(id);
    if (!team) return null;

    team.name = name;
    team.description = description;
    await team.save();
    return team;
  }

  async deleteTeam(id) {
    const deletedTeam = await Team.deleteOne({ _id: id });
    return !!deletedTeam.deletedCount;
  }
}

module.exports = TeamsService;
