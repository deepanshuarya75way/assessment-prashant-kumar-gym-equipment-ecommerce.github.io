const express = require('express')
const Discount = require ('./discount.model');
const router = express.Router()

router.get('/', async (requestAnimationFrame, res)=>{
  try {
    const discounts = await Discount.find({isActive: true});
    res.status(200).json(discounts);

    
  } catch (error) {
    res.status(500).json({message: "failed to fetch data"});
    
  }
});

router.post('/', async (req, res) =>{
  try {
    const {area, discountPercentage, isActive} = req.body;
    if (!area || discountPercentage === undefined) {
      return res.status(400).json({ message :" Area and discountPercentage are required"});
      
    }

    const areaLower = area.toLowercase().trim();
    let discount = await Discount.findOne({area : areaLower});

    if (discount) {
      discount.discountPercentage = discountPercentage ;
      if (isActive !== undefined) discount.isActive = isActive ;
        await discount.save();
        
      
      
    } else {
      discount = new Discount ({ area : areaLower, discountPercentage, inActive: inActive!== undefined ? isActive : true});
      await discount.save();
      
    }
      res.status(200).json ({ message: "discount configured", discount});
   }
    catch (error) {
    res.status(500).json({message: "discount configured", discount})
  }
})
module.exports = router;