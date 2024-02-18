export interface CustomError {
  data: { error: string };
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    averageRating?: number;
    ratingsCount?: number;
    maturityRating: string;
    language: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };

  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: {
      amount: string;
    };
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };

  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  searchInfo?: {
    textSnippet: string;
  };
}
