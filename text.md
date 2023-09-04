https://i.imgur.com/2LDUDB6.jpeg

          userId: data.uid,
          username: data.displayName,
          slug: slugify(data.displayName, { lower: true }),
          email: data.email,
          photoURL: data.photoURL,
          createdAt: serverTimestamp(),
