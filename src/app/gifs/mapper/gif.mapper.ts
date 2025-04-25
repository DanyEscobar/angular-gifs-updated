import { Gif } from "../interfaces/gif.interface";
import { GiphyData } from "../interfaces/giphy.interfaces";

export class GifMapper {

  static mapGiphyItemToGif( item: GiphyData ): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemsToGifArray( items: GiphyData[] ): Gif[] {
    return items.map( this.mapGiphyItemToGif);
  }
}
