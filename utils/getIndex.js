const Counter = require("../models/CounterModel")

async function getNextSequence() {
  try {
    const counter = await Counter.findOneAndUpdate({}, { $inc: { seq: 1 } }, { new: true }).exec();
    console.log(counter.seq);
    return counter.seq;
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
}

exports.getNextSequence = getNextSequence