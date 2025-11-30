
import { MdSearchOff } from "react-icons/md";
 

export const NoResults = ({searchResult}) => {
  return (
    <div> 
        {
            searchResult && searchResult.length === 0 && (
              <article className="bg-white/80 backdrop-blur-sm border-white/20">
                <section className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <MdSearchOff className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No hay resultados
                  </h3>
                                 
                                 
                </section>
              </article>
            )
        }

    </div>
  )
}
