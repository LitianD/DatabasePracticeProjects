delimiter;;
CREATE OR REPLACE PROCEDURE question4()
BEGIN
	DECLARE s_sno CHAR(8);
	DECLARE	s_grade INT(10);
	DECLARE	s_sname CHAR(10);
	DECLARE	s_sex CHAR(1);
	DECLARE done INT DEFAULT FALSE;
	
	DECLARE	cur_avg_grade CURSOR FOR
		SELECT sno,AVG(grade) FROM SC 
		GROUP BY sno
		HAVING AVG(grade)>80;
		
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	OPEN cur_avg_grade;
	
	my_loop:LOOP
		FETCH cur_avg_grade INTO s_sno,s_grade;
		SELECT sname,sex INTO s_sname，s_sex FROM s
			WHERE sno = s_sno;
		select @s_sno,@s_sex,@s_grade;
	
	END LOOP;
	CLOSE cur_avg_grade;
END	
;;
delimiter;

CREATE TRIGGER No_lower_Grade_Trig 
AFTTER update
ON sc FOR EACH ROW
BEGIN 
     if (NEW.grade < OLD.grade)then
	  ROLLBACK TRANSACTION
	  END IF;
END

