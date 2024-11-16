const EmployeeSalary = require('../Model/empSalary')
const Employee = require('../Model/employee'); 



exports.createSalary = async (req, res) => {
    const {salaryMonth, Basic, Hra, travel } = req.body;
  
    if (!salaryMonth || !Basic ||!Hra || !travel) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    if (typeof Basic !== 'number' ||typeof Hra !== 'number' || typeof travel !== 'number') {
      return res.status(400).json({ message: "HRA and Travel must be numbers" });
    }
  
    try {
      let salary = await EmployeeSalary.findOne({ employeeId: req.params.employeeId, salaryMonth });
  
      if (salary) {
        
        salary.Basic
        salary.Hra = Hra;
        salary.travel = travel;
        await salary.save();
      } else {
        
        salary = new EmployeeSalary({
          employeeId: req.params.employeeId,
          salaryMonth,
          Basic,
          Hra,
          travel,
        });
        await salary.save();
      }
  
      res.status(200).json(salary);
    } catch (err) {
      res.status(500).json({ message: "Error updating salary", error: err.message });
    }
  }


exports.getSalary =  async (req, res) => {
    try {
        
        const { employeeId } = req.params;

        
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        
        const salaries = await EmployeeSalary.find({ employeeId });

        
        if (salaries.length === 0) {
            return res.status(404).json({ message: 'No salary records found for this employee' });
        }

        
        res.status(200).json({
            message: 'Salary records found',
            salaries: salaries 
        });
    } catch (error) {
        console.error('Error fetching salary data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};