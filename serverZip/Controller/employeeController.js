const Employee = require('../Model/employee')


 const createEmployee = async(req,res)=>{
    try{
        const emp  = new Employee(req.body)
        const savedEmployee = await emp.save()
        res.status(201).json(savedEmployee)
    }catch(error){
        res.status(400).json(error)
    }
} 


const getAllEmployee = async(req,res)=>{
    try{
        const employees = await Employee.find()
        res.status(200).json(employees)

    }catch(error){
        res.status(500).json(error)

    }
}


  const updateEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const { name, age, address } = req.body;
  
    try {
      const employee = await Employee.findByIdAndUpdate(employeeId, { name, age, address }, { new: true });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating employee' });
    }
  }

module.exports = {createEmployee,getAllEmployee,updateEmployee}