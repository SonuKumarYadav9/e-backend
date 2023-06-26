import aadharPayModel from "../../../models/commissions/aadharPayCommission.js";

export const createAadharpayCommission = async (req, res) => {
  try {
    let { type, retailer } = req.body;

    // Create a new commission document
    const commission = new aadharPayModel({
      type,
      retailer,
    });

    // Save the commission to the database
    const savedCommission = await commission.save();
    console.log(savedCommission);

    res.status(201).json({
      status: "success",
      message: "Commission created successfully.",
      data: savedCommission,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to create commission.",
      msg: error.message,
    });
  }
};

export const updateAadharpayCommission = async (req, res) => {
  try {
    let data = req.body;
    let { type, retailer, commissionId } = data;

    let user = await aadharPayModel.findById(commissionId);

    if (user) {
      let updatedData = {};

      if (type) {
        updatedData.type = type;
      }

      if (retailer) {
        updatedData.retailer = retailer;
      }

      const updated = await aadharPayModel.findByIdAndUpdate(
        user._id,
        updatedData,
        { new: true }
      );
      return res
        .status(200)
        .send({ status: true, msg: "success", data: updated });
    }

    return res
      .status(404)
      .send({ status: false, msg: "Commission not found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to update commission.",
      msg: error.message,
    });
  }
};

