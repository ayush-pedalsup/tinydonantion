const { handleError, sendres } = require("../../utils/helper");
const { NonProfit } = require("../../models/NonProfit");

const add = async (req, res) => {
  try {
    const { name, summary, url, logo } = req.body;

    if (!name || !summary || !url || !logo) {
      return sendres(400, { message: "All fields are required" }, res);
    }
    const findNonProfit = await NonProfit.find({ name });
    if (findNonProfit.length > 0) {
      return sendres(
        400,
        {
          message:
            "Non Profit organization with this name is already registered",
        },
        res
      );
    }
    let member = await NonProfit.create({ name, summary, url, logo });
    if (member) {
      member = member.sanitize();
      return sendres(
        201,
        {
          message: `Non Profit organization successfully created`,
          member,
        },
        res
      );
    }
    return sendres(400, { message: "Not able to save the data" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const update = async (req, res) => {
  try {
    const { name, newName, summary, url, logo } = req.body;

    if (!name || !summary || !url || !logo) {
      return sendres(400, { message: "All fields are required" }, res);
    }
    if (name) {
      const member = await NonProfit.findOneAndUpdate(
        { name },
        { $set: { name: newName, summary, url, logo } },
        { new: true }
      ).exec();
      if (member) {
        return sendres(
          200,
          {
            message: `Non Profit organization with name ${name} successfully updated`,
          },
          res
        );
      }
      return sendres(400, { message: "User not found" }, res);
    }
  } catch (err) {
    handleError(err, res);
  }
};

const remove = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const findMember = await NonProfit.findOne({ name });
      if (findMember) {
        const member = await NonProfit.deleteOne({ name });
        if (member) {
          return sendres(200, { message: "Successfully removed" }, res);
        }
      }
      return sendres(
        400,
        { message: "Non Profit organization with this name is not registered" },
        res
      );
    }
    return sendres(
      400,
      { message: "Name of Non Profit Organization is required" },
      res
    );
  } catch (err) {
    handleError(err, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      let findMember = await NonProfit.findOne({ name });
      if (findMember) {
        findMember = findMember.sanitize();
        return sendres(200, { findMember }, res);
      }
      return sendres(
        400,
        { message: "Non Profit organization with this name is not registered" },
        res
      );
    }
    return sendres(
      400,
      { message: "Name of Non Profit Organization is required" },
      res
    );
  } catch (err) {
    handleError(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const findAllMember = await NonProfit.find();
    if (findAllMember) {
      return sendres(200, { findAllMember }, res);
    }
    return sendres(400, { member: "No Non profit Organization Found" });
  } catch (err) {
    handleError(err, res);
  }
};

const uploadlogo = (req, res) => {
  try {
    let file = req.file;
    return sendres(
      200,
      { link: file.location, uploaded: file.originalname },
      res
    );
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  add,
  update,
  remove,
  getOne,
  getAll,
  uploadlogo,
};
