from os import SEEK_END

from gcode import gcode_key


file_sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']


def get_friendly_file_size(b):
    """
    Gets human friendly formatted file sizes in 1000 and 1024 multiples
    :param b: File size in bytes
    :return: Tuple of two formatted file sizes in 1000 and 1024 multiples respectively
    """
    i = 0
    check = b
    size1024 = b
    size1000 = b
    while check // 1024 != 0:
        size1000 /= 1000
        size1024 /= 1024
        check //= 1024
        i += 1
    return f'{size1000:.2f} {file_sizes[i]}B', f'{size1024:.2f} {file_sizes[i]}iB'


def get_cubic_volume(kv):
    """
    Gets the cubic volume in the contained boundaries in mm^3 units
    :param kv: Metadata dictionary
    :return: Numeric if metadata has necessary keys, None otherwise
    """
    v = None
    try:
        x = kv[gcode_key.MAXX] - kv[gcode_key.MINX]
        y = kv[gcode_key.MAXY] - kv[gcode_key.MINY]
        z = kv[gcode_key.MAXZ] - kv[gcode_key.MINZ]
        v = x * y * z
    except KeyError:
        pass
    return v


def calculate_statistics(kv, f):
    """
    Calculates model statistics given its metadata and file path.
    Metadata fields are required to calculate the statistics.
    :param kv: Metadata dictionary
    :param f: File
    :return: Dictionary containing the stats
    """
    metadata = dict()
    f.seek(0, SEEK_END)
    b = f.tell()
    f.seek(0)
    metadata['FILE_SIZE_1000'], metadata['FILE_SIZE_1024'] = get_friendly_file_size(b)

    if gcode_key.TIME in kv:
        metadata['ETA_SECONDS'] = kv[gcode_key.TIME]

    # TODO Distance travelled
    key = 'DISTANCE'
    if key in kv:
        metadata[key] = kv[key]

    cubic_volume = get_cubic_volume(kv)
    if cubic_volume is not None:
        metadata['CUBIC_VOLUME'] = cubic_volume

    if gcode_key.LAYER_COUNT in kv:
        metadata['LAYER_COUNT'] = kv[gcode_key.LAYER_COUNT]

    if gcode_key.FILAMENT_USED in kv:
        metadata['FILAMENT_USED'] = kv[gcode_key.FILAMENT_USED][:-1] + ' m'

    return metadata
