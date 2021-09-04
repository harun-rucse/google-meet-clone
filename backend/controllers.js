const { getCallId, saveCallId } = require('./models');

exports.saveCallId = async (req, res) => {
  try {
    const { id, signalData } = req.body;
    await saveCallId(id, signalData);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCallId = async (req, res) => {
  try {
    const { id } = req.params;
    const code = await getCallId(id);

    res.status(200).json({ success: true, code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
