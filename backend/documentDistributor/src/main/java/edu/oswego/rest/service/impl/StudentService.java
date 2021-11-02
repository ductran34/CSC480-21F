package edu.oswego.rest.service.impl;


import edu.oswego.rest.dao.IStudentDAO;
import edu.oswego.rest.dao.impl.StudentDAO;
import edu.oswego.util.objects.Student;
import edu.oswego.rest.service.IStudentService;

import java.util.List;

public class StudentService implements IStudentService {

    IStudentDAO studentDao;
    public StudentService()
    {
        studentDao = new StudentDAO();
    }
    @Override
    public Student save(Student student) {
        studentDao.save(student);
        return studentDao.findOne(student.getStudentID());
    }
    @Override
    public List<Student> findAll() {
        return studentDao.findAll();
    }

    public Student findOne(String studentId) {
        return studentDao.findOne(studentId);
    }

    public Student findTeamID(int id) {
        return studentDao.findTeamID(id);
    }

    @Override
    public Student update(Student student) {
        studentDao.update(student);
        return studentDao.findOne(student.getStudentID());
    }

    @Override
    public Student delete(Student student) {
        studentDao.delete(student);
        return student;
    }

    @Override
    public void deleteAll() {
        studentDao.deleteAll();
    }
    
    public Student findUserID(int userId) {
        return studentDao.findUserID(userId);
    }
}