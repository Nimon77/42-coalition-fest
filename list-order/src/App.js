import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import './App.css';
import { remoteOrdersDb, localOrdersDb } from './const.js';

function finish(cell, id) {
	localOrdersDb.upsert(id, function(order) {
		if (cell === "beer[0].demi")
			order.beer[0].demi.finish = order.beer[0].demi.finish === 0 ? 1 : 0;
		else if (cell === "beer[0].litron")
			order.beer[0].litron.finish = order.beer[0].litron.finish === 0 ? 1 : 0;
		else if (cell === "beer[1].demi")
			order.beer[1].demi.finish = order.beer[1].demi.finish === 0 ? 1 : 0;
		else if (cell === "beer[1].litron")
			order.beer[1].litron.finish = order.beer[1].litron.finish === 0 ? 1 : 0;
		else if (cell === "beer[2].demi")
			order.beer[2].demi.finish = order.beer[2].demi.finish === 0 ? 1 : 0;
		else if (cell === "beer[2].litron")
			order.beer[2].litron.finish = order.beer[2].litron.finish === 0 ? 1 : 0;
		return order;
	}).then(function (res) {
		get_rows();
	}).catch(function (err) {
		console.log(err);
	});
}

function finish_order(id) {
	localOrdersDb.upsert(id, function(order) {
		order._deleted = true;
		return order;
	}).then(function (res) {
		get_rows();
	}).catch(function (err) {
		console.log(err);
	});
}

function color(finish, value) {
	if (finish === 1 || value === "0")
		return 'success';
	return 'secondary';
}

function is_finish(order) {
	if (order.beer[0].demi.finish && order.beer[1].demi.finish && order.beer[2].demi.finish && order.beer[0].litron.finish && order.beer[1].litron.finish && order.beer[2].litron.finish)
		return "bg-warning";
	return ;
}

function get_rows() {
	localOrdersDb.find({
		selector: {
			table: {$gte: null}
		},
	}, function (err, result) {
		if (err) { return console.log(err); }
		var rows = result.docs.map((order) => (
			<tr id={order._id} class={is_finish(order)}>
				<th width="10%">{order.table}</th>
				<td>
					<Button value="beer[0].demi" variant={color(order.beer[0].demi.finish, order.beer[0].demi.value)} size="lg" block onClick={event => finish(event.target.value, order._id)}>
						{order.beer[0].demi.value}
					</Button>
				</td>
				<td>
					<Button value="beer[0].litron" variant={color(order.beer[0].litron.finish, order.beer[0].litron.value)} size="lg" block onClick={event => finish(event.target.value, order._id)}>
						{order.beer[0].litron.value}
					</Button>
				</td>
				<td>
					<Button value="beer[1].demi" variant={color(order.beer[1].demi.finish, order.beer[1].demi.value)} size="lg" block onClick={event => finish(event.target.value, order._id)}>
						{order.beer[1].demi.value}
					</Button>
				</td>
				<td>
					<Button value="beer[1].litron" variant={color(order.beer[1].litron.finish, order.beer[1].litron.value)} size="lg" block onClick={event => finish(event.target.value, order._id)}>
						{order.beer[1].litron.value}
					</Button>
				</td>
				<td>
					<Button value="beer[2].demi" variant={color(order.beer[2].demi.finish, order.beer[2].demi.value)} size="lg" block onClick={event => finish(event.target.value, order._id)}>
						{order.beer[2].demi.value}
					</Button>
				</td>
				<td>
					<Button value="beer[2].litron" variant={color(order.beer[2].litron.finish, order.beer[2].litron.value)} size="lg" block onClick={event => finish(event.target.value, order._id)}>
						{order.beer[2].litron.value}
					</Button>
				</td>
				<td width="7%">
					<Button value="finish" variant="primary" onClick={() => finish_order(order._id)}>
						Terminer
					</Button>
				</td>
			</tr>
		));
		ReactDOM.render(rows, document.getElementById('rows'));
	});
}

localOrdersDb.createIndex({
    index: {
        fields: ['_id', 'table'],
        name: 'OrdersList',
        ddoc: 'OrdersList',
    }
}).then(function (result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
})

localOrdersDb.sync(remoteOrdersDb, {
	live: true
}).on('change', function (change) {
	get_rows();
}).on('error', function (err) {
	console.log(err);
});

//TODO: check when connection lost

function App() {
	return (
		<div className="App">
		<ul>
			<Table striped bordered hover variant="white" responsive="sm">
				<thead>
					<tr>
						<th rowSpan="2">Table</th>
						<th colSpan="2">Hefeweizen</th>
						<th colSpan="2">Blanche</th>
						<th colSpan="2">Buchesse</th>
						<th rowSpan="2"></th>
					</tr>
					<tr>
						<th>0.5L</th><th>1L</th><th>0.5L</th><th>1L</th><th>0.5L</th><th>1L</th>
					</tr>
				</thead>
				<tbody id='rows'>
					{get_rows()}
				</tbody>
			</Table>
		</ul>
		</div>
	);
}

export default App;
