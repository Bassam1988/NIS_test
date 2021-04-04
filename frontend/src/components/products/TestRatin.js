/*<Box component="fieldset" mb={3} bordercolor="transparent" >
<Typography component="legend">Custom icon and color</Typography>
<StyledRating
  name="customized-color"
  defaultValue={2}
  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
  precision={0.5}
  icon={<FavoriteIcon fontSize="inherit" />}
/>
</Box>
<ReactStars
                                      count={5}
                                      value={2}
                                      onChange={ratingChanged}
                                      size={24}
                                      isHalf={true}
                                      emptyIcon={
                                        <i className="far fa-star"></i>
                                      }
                                      halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                      }
                                      fullIcon={<i className="fa fa-star"></i>}
                                      activeColor="#ffd700"
                                    />*/