from gcode import gcode_key, gcode_token, stats


def read_metadata(f):
    """
    Reads the metadata until LAYER_COUNT token is found inclusively
    Numeric values are converted to floats.
    :param f: Read stream of the file
    :return: Dictionary of metadata keys and values
    """
    kv = dict()
    for line in f:
        key, value = read_key(line)
        if key is not None and value is not None:
            kv[key] = value
            if key == gcode_key.LAYER_COUNT:
                break
    return kv


def read_key(line):
    """
    Parse a key value line
    :param line: Line with key and value
    :return: Tuple with key and value. If no key and value are found their values are None
    """
    k, v = None, None
    key_value = [p.strip() for p in line.split(':')]
    if len(key_value) == 2:
        k = key_value[0][1:]  # Ignores starting ';'
        try:
            v = int(key_value[1])
        except ValueError:
            try:
                v = float(key_value[1])
            except ValueError:
                v = key_value[1]
    return k, v


def parse_g0_move(line):
    """
    Parse a G0 movement line
    :param line: Movement line
    :return: Tuple G0, x, y, f
    """
    x, y, f = None, None, None
    has_e = False
    for p in line.split(' '):
        if p.startswith('X'):
            x = float(p[1:])
        elif p.startswith('Y'):
            y = float(p[1:])
        elif p.startswith('E'):
            has_e = True
        elif p.startswith('F'):
            f = float(p[1:])
    # if has_e:
    return gcode_token.G0, x, y, f
    # return None


def read_layers(f):
    """
    Parse layers metadata and actions
    :param f: Read stream of model file
    :return: List of layers, each a dictionary of a number and a list of actions
    """
    layers = []
    layer_no_start = f';{gcode_key.LAYER}:'
    actions = None
    for line in f:
        if line.startswith(layer_no_start):
            actions = []
            layers.append({
                'number': read_key(line)[1],
                'actions': actions,
            })
        elif actions is not None:
            if line.startswith(gcode_token.G0):
                move = parse_g0_move(line)
                if move is not None:
                    actions.append(move)
            elif line.startswith(gcode_token.G28):
                actions.append((gcode_token.G28,))
    return layers


def read(f, filename):
    """
    Reads the model file
    :param f: File to be processed
    :param filename: Name of the file to be processed
    :return: Tuple with statistics dictionary and layer list
    """
    # f = open(path, 'r'):
    kv = read_metadata(f)
    d_stats = stats.calculate_statistics(kv, f)
    d_stats['FILENAME'] = filename
    layers = read_layers(f)
    return d_stats, layers
