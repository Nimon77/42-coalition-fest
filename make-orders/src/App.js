import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { remoteOrdersDb } from './const.js';

const tables = []
	for (var i = 1; i <= 24; i++) {
		tables.push(
			<option value={i}> {i} </option>
		)
	}

const boissons = []
	for (i = 0; i <= 10; i++) {
		boissons.push(
			<option value={i}> {i} </option>
		)
	}

function send(values) {
	values.beer[0].demi.finish = values.beer[0].demi.value === "0" ? 1 : 0 ;
	values.beer[0].litron.finish = values.beer[0].litron.value === "0" ? 1 : 0 ;
	values.beer[1].demi.finish = values.beer[1].demi.value === "0" ? 1 : 0 ;
	values.beer[1].litron.finish = values.beer[1].litron.value === "0" ? 1 : 0 ;
	values.beer[2].demi.finish = values.beer[2].demi.value === "0" ? 1 : 0 ;
	values.beer[2].litron.finish = values.beer[2].litron.value === "0" ? 1 : 0 ;
	values.coca.finish = values.coca.value === "0" ? 1 : 0;
	values.orangina.finish = values.orangina.value === "0" ? 1 : 0;
	remoteOrdersDb.post(values, function(err, response) {
		if (err) { return console.log(err); }
		console.log(response);
		change_table(values.table);
	  });
	return ;
}

function change_table (value) {
	remoteOrdersDb.find({
		selector: {
			table: {$eq: value}
		}
	}, function(err, result) {
		if (err) { return console.log(err); }
		var table
		if (result.docs.length !== 0) {
			var rows = result.docs.map((order) => (
				<tr>
					<td>{order.beer[0].demi.value}</td>
					<td>{order.beer[0].litron.value}</td>
					<td>{order.beer[1].demi.value}</td>
					<td>{order.beer[1].litron.value}</td>
					<td>{order.beer[2].demi.value}</td>
					<td>{order.beer[2].litron.value}</td>
					<td>{order.coca.value}</td>
					<td>{order.orangina.value}</td>
				</tr>
			))
			table = (
				<table class="table table-white table-striped table-bordered table-sm">
					<thead>
						<tr><th colSpan="8">Commande en cours :</th></tr>
						<tr>
							<th colSpan="2">Hefeweizen</th>
							<th colSpan="2">Blanche</th>
							<th colSpan="2">Buchesse</th>
							<th colSpan="2"></th>
						</tr>
						<tr>
							<th>0.5L</th><th>1L</th><th>0.5L</th><th>1L</th><th>0.5L</th><th>1L</th><th width="10%">Coca</th><th width="10%">Orangina</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			)
		}
		ReactDOM.render(table, document.getElementById('en_cours'));
	})
}

const validation = Yup.object().shape({
	table: Yup.string().notOneOf(["0"], 'Merci de selectionner une table').required('Required'),
})

function FormDrink () {
	return (
	<Formik
		initialValues={{
			table: "0",
			beer: [
				{
					demi: {
						value: "0",
						finish: 0
					},
					litron: {
						value: "0",
						finish: 0
					}
				},
				{
					demi: {
						value: "0",
						finish: 0
					},
					litron: {
						value: "0",
						finish: 0
					}
				},
				{
					demi: {
						value: "0",
						finish: 0
					},
					litron: {
						value: "0",
						finish: 0
					}
				}
			],
			coca: {
				value: "0",
				finish: 0
			},
			orangina: {
				value: "0",
				finish: 0
			},
		}}
		onSubmit={send}
		validationSchema={validation}
	>
	{({
		handleSubmit,
		handleChange,
		values,
		touched,
		errors,
	}) => (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="ControlTable">
				<Form.Label>Numeros de table :</Form.Label>
				<Form.Control
					as="select"
					value={values.table}
					name="table"
					onChange={(e) => {handleChange("table")(e); change_table(e.currentTarget.value);}}
					isValid={touched.table && !errors.table}
					isInvalid={errors.table}
				>
					<option value="0" selected>Selectionner une table</option>
					{tables}
				</Form.Control>
				<ErrorMessage name='table' render={(msg) => <p class="text-danger">{msg}</p>}/>
				<div id="en_cours"></div>
			</Form.Group>
			<br></br>
			<Form.Label>Hefeweizen</Form.Label>
			<Form.Group>
				<Form.Row className="align-items-center">
					<Col>
						<Form.Label column="sm">0.5L</Form.Label>
						<Form.Control
							as="select"
							name="beer[0].demi.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
					<Col>
						<Form.Label column="sm">1L</Form.Label>
						<Form.Control
							as="select"
							name="beer[0].litron.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
				</Form.Row>
			</Form.Group>
			<Form.Label>Meteor Blanche</Form.Label>
			<Form.Group>
				<Form.Row className="align-items-center">
					<Col>
						<Form.Label column="sm">0.5L</Form.Label>
						<Form.Control
							as="select"
							name="beer[1].demi.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
					<Col>
						<Form.Label column="sm">1L</Form.Label>
						<Form.Control
							as="select"
							name="beer[1].litron.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
				</Form.Row>
			</Form.Group>
			<Form.Label>Meteor la Buchesse ambrée</Form.Label>
			<Form.Group>
				<Form.Row className="align-items-center">
					<Col>
						<Form.Label column="sm">0.5L</Form.Label>
						<Form.Control
							as="select"
							name="beer[2].demi.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
					<Col>
						<Form.Label column="sm">1L</Form.Label>
						<Form.Control
							as="select"
							name="beer[2].litron.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
				</Form.Row>
			</Form.Group>
			<Form.Label>Soft</Form.Label>
			<Form.Group>
				<Form.Row className="align-items-center">
					<Col>
						<Form.Label column="sm">Coca-Cola</Form.Label>
						<Form.Control
							as="select"
							name="coca.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
					<Col>
						<Form.Label column="sm">Orangina</Form.Label>
						<Form.Control
							as="select"
							name="orangina.value"
							onChange={handleChange}
						>
							{boissons}
						</Form.Control>
					</Col>
				</Form.Row>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	)}
    </Formik>
  );
}

function App() {
	return (
		<div className="App">
			{FormDrink()}
		</div>
	);
}

export default App;
