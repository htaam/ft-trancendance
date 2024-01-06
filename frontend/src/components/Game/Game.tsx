import "./Game.css";

const Game: React.FC = () => {
	let height = 60;
	let width = 85;

	let p1_pos_x = 5;
	let p1_pos_y = height / 2;

	let p2_pos_x = 5;
	let p2_pos_y = height / 2;

	let ball_pos_x = width / 2;
	let ball_pos_y = height / 2;

	let ball_x_dir = 0;
	let ball_y_dir = 0;

	let p1_up = 0;
	let p1_down = 0;

	let p2_up = 0;
	let p2_down = 0;

	let p1_dir = 0;
	let p2_dir = 0;

	let p1_score_counter;
	let p2_score_counter;

	let win_text;

	let p1_score = 0;
	let p2_score = 0;

	let move_speed = 0.2;
	let update_time = 5;

	let AI_react = 0;

	let playmode = 0;

	let ball_speed_mod = 1;

	//0 = player 2 manual
	//1 = player 2 AI
	//2 = online mode

	let gamemode = 0;
	//0 = default
	//1 = speed mode

	let player_id = 1;

	document.addEventListener("keydown", (e) =>
	{
		if (e.key == "w")
		{
			if (player_id == 1)
				p1_up = 1;
			else if (player_id == 2)
				p2_up = 1;
		}
		if (e.key == "s")
		{
			if (player_id == 1)
				p1_down = 1;
			else if (player_id == 2)
				p2_down = 1;
		}
		if (e.key == "ArrowUp" && playmode == 0)
		{
			if (player_id == 1)
				p2_up = 1;
			if (player_id == 2)
				p1_up = 1;
		}
		if (e.key == "ArrowDown" && playmode == 0)
		{
			if (player_id == 1)
				p2_down = 1;
			if (player_id == 2)
				p1_down = 1;
		}
	});

	document.addEventListener("keyup", (e) =>
	{
		if (e.key == "w")
		{
			if (player_id == 1)
				p1_up = 0;
			else if (player_id == 2)
				p2_up = 0;
		}
		if (e.key == "s")
		{
			if (player_id == 1)
				p1_down = 0;
			else if (player_id == 2)
				p2_down = 0;
		}
		if (e.key == "ArrowUp" && playmode == 0)
		{
			if (player_id == 1)
				p2_up = 0;
			if (player_id == 2)
				p1_up = 0;
		}
		if (e.key == "ArrowDown" && playmode == 0)
		{
			if (player_id == 1)
				p2_down = 0;
			if (player_id == 2)
				p1_down = 0;
		}
	});

	function p1_move(x_pos: number, y_pos: number)
	{
		var element = document.getElementById("lp");
		if (element)
		{
			element.style.position = "absolute";
			element.style.left = x_pos + "vmin";
			element.style.top = y_pos + "vmin";
		}
	}

	function p2_move(x_pos: number, y_pos: number)
	{
		var element = document.getElementById("rp");
		if (element)
		{
			element.style.position = "absolute";
			element.style.right = x_pos + "vmin";
			element.style.top = y_pos + "vmin";
		}
	}

	function ball_move(x_pos: number, y_pos: number)
	{
		var element = document.getElementById("ball");
		if (element)
		{
			element.style.position = "absolute";
			element.style.left = x_pos + "vmin";
			element.style.top = y_pos + "vmin";
		}
	}

	function resetball()
	{
		ball_x_dir = move_speed * Math.sign(Math.random() * 100 - 50);
		ball_y_dir = move_speed * Math.sign(Math.random() * 100 - 50);
		p1_score_counter = document.querySelector(".left_score");
		p2_score_counter = document.querySelector(".right_score");
		if (p2_score_counter != null) p2_score_counter.innerHTML = String(p2_score);
		if (p1_score_counter != null) p1_score_counter.innerHTML = String(p1_score);
		ball_pos_x = width / 2;
		ball_pos_y = height / 2;
		if (p1_score >= 10)
		{
			win_text = document.querySelector(".win_text");
			if (win_text!= null) win_text.innerHTML = "P1 wins!";
		}
		if (p2_score >= 10)
		{
			win_text = document.querySelector(".win_text");
			if (win_text!= null) win_text.innerHTML = "P2 wins!";
		}
		ball_speed_mod = 1;
		AI_react_change();
	}

	function AI_play()
	{
			if (ball_pos_x > AI_react && ball_x_dir > 0 && p2_pos_y + 5 < ball_pos_y)
			{
				p2_dir = 1;
			}
			else if (ball_pos_x > AI_react && ball_x_dir > 0 && p2_pos_y + 5 > ball_pos_y)
			{
				p2_dir = -1;
			}
			else
			{
				p2_dir = 0;
			}
	}

	function AI_react_change()
	{
			AI_react = (Math.random() * 60) + 20;
	}

	setInterval(updategame, update_time);
	function updategame() {
		p1_dir = p1_down - p1_up;
		p2_dir = p2_down - p2_up;
	if (playmode == 1)
		AI_play();
		if (p1_dir < 0)
		{
			if (p1_pos_y > 0)
			{
				p1_pos_y -= move_speed;
				p1_move(p1_pos_x, p1_pos_y);
			}
		}
		if (p1_dir > 0) {
			if (p1_pos_y < height - 10)
			{
				p1_pos_y += move_speed;
				p1_move(p1_pos_x, p1_pos_y);
			}
		}
		if (p2_dir < 0)
		{
			if (p2_pos_y > 0)
			{
				p2_pos_y -= move_speed;
				p2_move(p2_pos_x, p2_pos_y);
			}
		}
		if (p2_dir > 0)
		{
			if (p2_pos_y < height - 10)
			{
				p2_pos_y += move_speed;
				p2_move(p2_pos_x, p2_pos_y);
			}
		}
		if (ball_x_dir == 0 || ball_y_dir == 0)
		{
			resetball();
		}
		if (ball_pos_x < 0)
		{
			p2_score++;
			resetball();
		}
		if (ball_pos_x > width)
		{
			p1_score++;
			resetball();
		}

		if (ball_pos_y > height) ball_y_dir = -move_speed;
		else if (ball_pos_y < 0) ball_y_dir = move_speed;

		if
		(
			ball_pos_x > width - 8 &&
			ball_pos_x < width - 3 &&
			ball_pos_y < p2_pos_y + 10 &&
			ball_pos_y > p2_pos_y
		)
		{
			ball_x_dir = -move_speed;
			if (gamemode == 1) ball_speed_mod *= 1.04;
		}
		else if
		(
			ball_pos_x < 0 + 8 &&
			ball_pos_x > 0 + 3 &&
			ball_pos_y < p1_pos_y + 10 &&
			ball_pos_y > p1_pos_y
		)
		{
		{
				ball_x_dir = move_speed;
				if (gamemode == 1) ball_speed_mod *= 1.04;
		}
			AI_react_change();
		}
		ball_pos_y = ball_pos_y + (ball_y_dir * ball_speed_mod);
		ball_pos_x = ball_pos_x + (ball_x_dir * ball_speed_mod);
		ball_move(ball_pos_x, ball_pos_y);
	}

	return (
		<div className="game">
			<div id="pong" className="pong">
				<div id="lp" className="leftplayer"></div>
				<div id="rp" className="rightplayer"></div>
				<div id="ball" className="ball"></div>
				<h1 className="left_score">0</h1>
				<h1 className="right_score">0</h1>
				<h1 className="win_text"></h1>
			</div>
		</div>
	);
};

export default Game;


// TODO
// Win at 10 score
// New game mode
// Split for server
// Setup game modes