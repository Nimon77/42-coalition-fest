import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik'
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

const validation = Yup.object().shape({
	table: Yup.string().notOneOf(["0"]).required('Select table'),
})

function send(values) {
	remoteOrdersDb.post(values, function(err, response) {
		if (err) { return console.log(err); }
		console.log(err);
	  });
	return ;
}

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
		handleBlur,
		values,
		touched,
		isValid,
		errors,
	}) => (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="ControlTable">
				<Form.Label>Numeros de table :</Form.Label>
				<Form.Control
					as="select"
					value={values.table}
					name="table"
					onChange={handleChange}
					isValid={touched.table && !errors.table}
				>
					<option value="0">Selectionner une table</option>
					{tables}
				</Form.Control>
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

function MakeOrder() {
	return (
		<div className="App">
			{FormDrink()}
		</div>
	);
};

export default MakeOrder;
