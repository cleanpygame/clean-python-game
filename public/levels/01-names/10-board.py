## Verbs
## chess.py
# It is simple: 
# 'initialization' consists of 'creating a board' and 'using a parser'!

def initialization(board_json):
    n = board_json['size']
    board = creating_board(n, n)
    parser(json, board)

## add-on $initialization
# Hint for the future: functions = verbs, variables = nouns.
## end
## replace-inline $n n
## with board_size
## replace-inline $initialization initialization
## with initialize_board
## replace-inline $creating_board creating_board
## with create_board
## replace-inline $parser parser
## with parse_board

