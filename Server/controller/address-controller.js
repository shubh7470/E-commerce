const Address = require('../schema/address-schema');

exports.saveAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json({ message: "Address saved successfully", address });
  } catch (err) {
    res.status(500).json({ message: "Error saving address", error: err.message });
  }
};

exports.getAddressByMobile = async (req, res) => {
  try {
    const address = await Address.findOne({ mobile: req.params.mobile });
    if (!address) return res.status(404).json({ message: "No address found" });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: "Error fetching address", error: err.message });
  }
};
