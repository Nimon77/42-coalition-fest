import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row } from 'react-bootstrap';
import { remoteOrdersDb } from './const.js';

function create_options(min, max, id) {
var select = document.getElementById(id);

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    select.appendChild(opt);
}
}

function MakeOrder() {
	return (
		<div className="App">
			<Form>
					<Form.Group controlId="table">
						<Form.Label>Numeros de table :</Form.Label>
						<Form.Control as="select" id="table_nbr">
							{create_options(0, 24, 'table_nbr')}
						</Form.Control>
					</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default MakeOrder;
