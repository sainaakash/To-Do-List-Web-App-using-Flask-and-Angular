from flask import Flask, request, redirect
from flask_restful import Api, Resource
from models import TasksModel, db
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///to-do.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.app_context().push()

api = Api(app)
db.init_app(app)

with app.app_context():
    db.create_all()

class TasksView(Resource):
    def get(self):
        tasks = TasksModel.query.all()
        return {'Tasks': [x.json() for x in tasks]}

    def post(self):
        data = request.get_json()
        
        
        due_date_str = data.get('dueDate')
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None

        new_task = TasksModel(content=data['content'], dueDate=due_date, completed=data['completed'])

        db.session.add(new_task)
        db.session.commit()

        return new_task.json(), 201

class SingleTaskView(Resource):
    def get(self, id):
        task = TasksModel.query.get(id)

        if task:
            return task.json()

        return {'message': 'Task not found'}, 404

    def delete(self, id):
        task = TasksModel.query.get(id)

        if task:
            db.session.delete(task)
            db.session.commit()
            return {'message': 'Deleted'}
        else:
            return {'message': 'Task not found'}, 404

    def put(self, id):
        data = request.get_json()
        task = TasksModel.query.get(id)

        if task:
            task.content = data['content']
            task.dueDate = datetime.strptime(data.get('dueDate'), '%Y-%m-%d').date() if data.get('dueDate') else None
            task.completed = data['completed']

            db.session.commit()
            return task.json()
        else:
            new_task = TasksModel(content=data['content'], dueDate=datetime.strptime(data.get('dueDate'), '%Y-%m-%d').date(), completed=data['completed'])

            db.session.add(new_task)
            db.session.commit()
            return new_task.json(), 201

api.add_resource(TasksView, '/tasks')
api.add_resource(SingleTaskView, '/task/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)
