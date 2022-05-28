import User from "../models/User.js";

export const get_user = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

      let user = await User.findOne({ refresh_token: refreshToken });
      let detail_user = Object.assign({name:user._doc.name},{email:user._doc.email},{phone_number:user._doc.phone_number},{refresh_token:user._doc.refresh_token});
      
      return res.status(200).json(detail_user);
    } catch (err) {
      return next(err);
    }
  };
