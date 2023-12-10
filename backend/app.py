from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
import uuid

app = Flask(__name__)
CORS(app)  # Enabling CORS for all routes

# Configuration of MySQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:ellabarn@localhost/heardfinancial'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Transaction(db.Model):
    transactionId = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(255))  # Added title field
    description = db.Column(db.String(255))
    amount = db.Column(db.Integer)
    fromAccount = db.Column(db.String(255))
    toAccount = db.Column(db.String(255))
    transactionDate = db.Column(db.String(255))

    def __repr__(self):
        return f"<Transaction {self.transactionId}>"

@app.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.json
    new_transaction = Transaction(
        title=data['title'],  # Include title in the data
        amount=data['amount'],
        description=data['description'],
        fromAccount=data['fromAccount'],
        toAccount=data['toAccount'],
        transactionDate=data['transactionDate']
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction created', 'transactionId': new_transaction.transactionId}), 201

@app.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([{
        'transactionId': transaction.transactionId,
        'title': transaction.title,  # Include title in the response
        'amount': transaction.amount,
        'description': transaction.description,
        'fromAccount': transaction.fromAccount,
        'toAccount': transaction.toAccount,
        'transactionDate': transaction.transactionDate
    } for transaction in transactions]), 200

@app.route('/transactions/<transactionId>', methods=['GET'])
def get_transaction(transactionId):
    transaction = Transaction.query.get(transactionId)
    if transaction:
        return jsonify({
            'transactionId': transaction.transactionId,
            'title': transaction.title,  # Include title in the response
            'amount': transaction.amount,
            'description': transaction.description,
            'fromAccount': transaction.fromAccount,
            'toAccount': transaction.toAccount,
            'transactionDate': transaction.transactionDate
        }), 200
    return jsonify({'message': 'Transaction not found'}), 404

@app.route('/transactions/<transactionId>', methods=['PUT'])
def update_transaction(transactionId):
    data = request.json
    transaction = Transaction.query.get(transactionId)
    if transaction:
        transaction.title = data['title']  # Update title
        transaction.amount = data['amount']
        transaction.description = data['description']
        transaction.fromAccount = data['fromAccount']
        transaction.toAccount = data['toAccount']
        transaction.transactionDate = data['transactionDate']
        db.session.commit()
        return jsonify({'message': 'Transaction updated'}), 200
    return jsonify({'message': 'Transaction not found'}), 404

@app.route('/transactions/<transactionId>', methods=['DELETE'])
def delete_transaction(transactionId):
    transaction = Transaction.query.get(transactionId)
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({'message': 'Transaction deleted'}), 200
    return jsonify({'message': 'Transaction not found'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables
    app.run(debug=True)
