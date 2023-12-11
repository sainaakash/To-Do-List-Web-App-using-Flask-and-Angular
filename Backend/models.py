from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TasksModel(db.Model):
    __tablename__ = 'tasks' 
    id = db.Column(db.Integer, primary_key=True)
    dueDate = db.Column(db.Date)
    content = db.Column(db.String(255))
    completed = db.Column(db.Boolean)

    def __init__(self, dueDate, content, completed=False):
        self.dueDate = dueDate
        self.content = content
        self.completed = completed

    def json(self):
        return {"id": self.id, "dueDate": str(self.dueDate), "content": self.content, "completed": self.completed}
        

    def __repr__(self):
        return f"<Task(id={self.id}, dueDate={self.dueDate}, content={self.content}, completed={self.completed})>"
        
