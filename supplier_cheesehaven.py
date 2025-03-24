from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route('/order', methods=['POST'])
def process_order():
    # Fast response (0.5s delay)
    time.sleep(0.5)
    return jsonify({
        "status": "success",
        "message": "Order fulfilled by Cheese Haven",
        "supplier": "Cheese Haven"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5016, debug=False)