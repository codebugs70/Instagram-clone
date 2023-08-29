https://i.imgur.com/2LDUDB6.jpeg

                  {loading && (
                      <div className="w-full h-[567px] flex items-center justify-center">
                        <Loading />
                      </div>
                    )}

                    {!loading && images.length === 0 && (
                      <div className="w-full h-[567px] flex items-center justify-center">
                        <PostUpload onChange={handleSelectImage} />
                      </div>
                    )}

                    {!loading && images.length > 0 && (
                      <PostImages images={images} />
                    )}
