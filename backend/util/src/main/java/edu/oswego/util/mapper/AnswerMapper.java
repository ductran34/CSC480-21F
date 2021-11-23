package edu.oswego.util.mapper;

import edu.oswego.util.objects.Answer;
import edu.oswego.util.mapper.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AnswerMapper implements RowMapper<Answer>{
    @Override
    public Answer mapRow(ResultSet rs) {
        try {
            Answer answer = new Answer(
                    rs.getInt("answerID"),
                    rs.getInt("questionID"),
                    rs.getInt("submissionID"),
                    rs.getString("answer"),
                    rs.getFloat("score"),
                    rs.getFloat("possible")
            );
            return answer;
        }catch(SQLException e)
        {
            return null;
        }
    }
}
