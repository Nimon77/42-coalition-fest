<!DOCTYPE html>

<?php
	include 'vars.php';

	if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['table'])) {
		if ($_POST['beer1'] > 0 || $_POST['beer2'] > 0 || $_POST['beer3'] > 0) {
			try {
				$pdo = new PDO('mysql:host=localhost;dbname=coalition_fest', $user, $pass);
				$stmt = $pdo->prepare('INSERT INTO orders(place, beer1, beer2, beer3) VALUES (:place,:beer1,:beer2,:beer3)');
				$stmt->bindParam(':place', $_POST['table']);
				$stmt->bindParam(':beer1', $_POST['beer1']);
				$stmt->bindParam(':beer2', $_POST['beer2']);
				$stmt->bindParam(':beer3', $_POST['beer3']);
				$stmt->execute();
				$stmt = null;
				$pdo = null;
			} catch (PDOException $e) {
				print "Erreur !: " . $e->getMessage() . "<br/>";
				die();
			}
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
						<td>Numeros de table :</td>
						<td>
							<select name="table">
								<option value="">-- Choisissez votre table --</option>
								<?php
									for ($i = 1; $i < 25; $i++) {
										echo "<option value=\"$i\">$i</option>";
									}
								?>
							</select>
						</>
					</tr>
				</tbody>
			</table>
			<br>
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
