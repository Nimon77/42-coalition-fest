<!DOCTYPE html>

<?php
	if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['table'])) {
		if ($_POST['beer1'] > 0 || $_POST['beer2'] > 0 || $_POST['beer3'] > 0) {
			
		}
		else {
			echo "Choisir au moins 1 biere";
		}
	}
?>

<html>
	<head>
		<title>Faite votre commande</title>
	</head>
	<body>
		<form action="" method="POST">
			<table>
				<tbody>
					<tr>
						<td>Table number :</td>
						<td>
							<select name="table">
								<option value="">-- Select your table number --</option>
								<?php
									for ($i = 1; $i < 25; $i++) {
										echo "<option value=\"$i\">$i</option>";
									}
								?>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead><tr><th>Choix des bieres</th></tr></thead>
				<tbody>
					<tr>
						<td>Hefeweizen</td>
						<td>
							<select name="beer1">
								<?php
									for ($i = 0; $i <= 10; $i++) {
										echo "<option value=\"$i\">$i</option>";
									}
								?>
							</select>
						</td>
					</tr>
					<tr>
						<td>Meteor Blanche</td>
						<td>
							<select name="beer2">
								<?php
									for ($i = 0; $i <= 10; $i++) {
										echo "<option value=\"$i\">$i</option>";
									}
								?>
							</select>
						</td>
					</tr>
					<tr>
						<td>Meteor la Buchesse ambrée</td>
						<td>
							<select name="beer3">
								<?php
									for ($i = 0; $i <= 10; $i++) {
										echo "<option value=\"$i\">$i</option>";
									}
								?>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			<input type="submit">
		</form>
	</body>
</html>
