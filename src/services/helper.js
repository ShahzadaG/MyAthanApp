function utcOffsetToDouble(utcOffset) {
    const [hours, minutes] = utcOffset.split(':').map(Number);
    return hours + minutes / 60;
}

export { utcOffsetToDouble };
