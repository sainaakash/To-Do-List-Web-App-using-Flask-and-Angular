from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TasksModel(db.Model):
    __tablename__ = 'tasks' 
    id = db.Column(db.Integer, primary_key=True)
    dueDate = db.Column(db.Date)
    content = db.Column(db.String(255))

    def __init__(self, dueDate, content):
        self.dueDate = dueDate
        self.content = content

    def json(self):
        return {"id": self.id, "dueDate": str(self.dueDate), "content": self.content}
        

    def __repr__(self):
        return f"<Task(id={self.id}, dueDate={self.dueDate}, content={self.content})>"
        
